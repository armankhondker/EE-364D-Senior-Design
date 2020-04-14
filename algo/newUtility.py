from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from io import StringIO
import tweepy
from textblob import TextBlob

def engage_student_match(student, org, org_data):
    # print("Student: " + student['Name'] + " " + str(student['engaged']))
    # print(" Org: " + org['Org/Project'])
    orgRank = -1
    i = 0
    for proj in student['org_df']['ids']:
        if (proj == org['unique_id']):
            orgRank = i
            break
        i += 1
    # print("orgRank: " + str(orgRank))
    if (student['engaged'] == False):
        student['engaged'] = True
        student['orgRank'] = orgRank
        org['engaged'] = True
        org['match'] = student
        return True, 1
    else:
        oldRank = student['orgRank']
        if (oldRank > orgRank):
            old_id = student['org_df'].ids[oldRank]
            oldOrg = next((item for item in org_data if item["unique_id"] == old_id), "")
            oldOrg['engaged'] = False
            oldOrg['match'] = {'name': 'NO MATCH', 'unique_id': '-1'}
            student['engaged'] = True
            student['orgRank'] = orgRank
            org['engaged'] = True
            org['match'] = student
            return True, 0
        else:
            return False, 0

def convert_pdf_to_txt(path):
    rsrcmgr = PDFResourceManager()
    retstr = StringIO()
    codec = 'utf-8'
    laparams = LAParams()
    device = TextConverter(rsrcmgr, retstr, laparams=laparams)
    fp = open(path, 'rb')
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    password = ""
    maxpages = 0
    caching = True
    pagenos=set()

    for page in PDFPage.get_pages(fp, pagenos, maxpages=maxpages, password=password,caching=caching, check_extractable=True):
        interpreter.process_page(page)

    text = retstr.getvalue()

    fp.close()
    device.close()
    retstr.close()
    return text


def get_pdf_score(text):
    consumer_key= '48IZviQDEhZKSTm3vYh7jWOKa'
    consumer_secret= 'evFa5bSTgxJ8xQjSom7jlWnpCOgJDYJ6B3PmAvdrxC2LT95Wa6'

    access_token='1131250496717709312-j58hita0e7XMgnLitpLGX2uj5nvi5n'
    access_token_secret='RlCXpFpOWl50jp8SqDVocuXVuSET2Y5ROrX6MMNWCzLA4'

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    api = tweepy.API(auth)

    analysis = TextBlob(text)
    if (analysis.sentiment > 0):
        return 2*analysis.sentiment
    else:
        return 0
