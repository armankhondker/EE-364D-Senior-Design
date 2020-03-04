import React from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window
} from "stream-chat-react";
import { MessageList, MessageInput } from "stream-chat-react";
import { StreamChat } from "stream-chat";

import "stream-chat-react/dist/css/index.css";

const chatClient = new StreamChat("qk4nn7rpcn75"); // Demo Stream Key
const userToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY29vbC1za3ktOSJ9.mhikC6HPqPKoCP4aHHfuH9dFgPQ2Fth5QoRAfolJjC4"; // Demo Stream Token

chatClient.setUser(
  {
    id: "cool-sky-9",
    name: "Cool sky",
    image: "https://getstream.io/random_svg/?id=cool-sky-9&name=Cool+sky"
  },
  userToken
);

const channel = chatClient.channel("messaging", "godevs", {
  // image and name are required, however, you can add custom fields
  image:
    "https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png",
  name: "Talk about Go"
});

const App = () => (
  <Chat client={chatClient} theme={"messaging light"}>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default App;
