import React from 'react';

import MarkdownRenderer from '.';

const dummyMD = `# Hoc erectus mittitur

## Sacerdos umerum loco

Lorem markdownum pocula *tamen toto* arma urbem interiit ab telaque subit iam
est inmurmurat meritos longum. Fontes condidit nunc pedum, bis cacumen novat.
Aversus maculavit balistave aptarique natam deos deponit. Parsque *Aries
crescens*, spectata mille poscis, hoc icta, *segnibus* amat habet requirit
mendacique lilia!

## Et numina quod aut amor iterum et

Est dura nil frequentant spectans soceri superabitur moras notitiamque terra:
est est nefasque, non flumina. Praesentia pedem violata. Cum hasta Ceyca
pondere? Pudet exstimulata mihi: suis mundus me comaeque dixit, adulterium
similis oculi positamque.

1. Aequora frenis iram virtute
2. Magna canum audita mali ad inerti aliturque
3. Prodere Triptolemus dextra ire Romulus metus cuncti
4. Esse mortis mactare dixerat me rex iam

## Alae non innumeras mensas

Nata niveis quem vires magnosque faciem regia amplecti si unus. Aut filia sit
*qui inpune* septem ventis longas protinus per alter. Et rapite invita
Alemoniden caelumque. Poterisne ab altera inscius. A tot parari formae litora.

## Dum frustra semina

Extulit tepidis. In \`duorum\` *conprecor protinus* simillimus novemque saxo quam
ferantur hausit et mihi sua? Cur armo precantia est nec inachus. Tenues pede sit
illa prima miserata rarior de precantum tum, nullis neque.
\`\`\` jsx
import React from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';

const App = () => (
  <Chat client={chatClient} theme={'messaging light'}>
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
\`\`\`

\`\`\` dart
class MyApp extends StatelessWidget {
  final Client client;
  final Channel channel;
  MyApp(this.client, this.channel);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      builder: (context, widget) {
        return StreamChat(
          child: widget,
          client: client,
        );
      },
      home: StreamChannel(
        channel: channel,
        child: ChannelPage(),
      ),
    );
  }
}
class ChannelPage extends StatelessWidget {
  const ChannelPage({
    Key key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: ChannelHeader(),
      body: Column(
        children: <Widget>[
          Expanded(
            child: MessageListView(),
          ),
          MessageInput(),
        ],
      ),
    );
  }
}
\`\`\`
Prima prius velle cupidine, o manet [parabat
Sigei](http://quibuset.org/terrafaceret.html), si. [Concipit volucrem
mercede](http://www.fuit.io/velat) victus circumspicit deusve perterritus ergo
donis sonos congreditur *gravidae*, actum adducitque. Prodesse nisi petunt
**clamabat**: cum spissi columbae flamina.`;

export const Default = () => <MarkdownRenderer md={dummyMD} />;

export default {
    component: MarkdownRenderer,
    title: 'shared/MarkdownRenderer',
};
