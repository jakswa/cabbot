class HelloPlugin {
  static helpText() {
    return '"<bot>: (hello|:wave:)" -- says hi if you end a mention with hello/:wave:'
  }

  newMessage(userMessage) {
    if (!userMessage.mentionedBot) return;

    if (userMessage.text.match(/hello$/)) {
      userMessage.respond({ text: `HI ${userMessage.authorName} WOW IT IS GOOD TO SEE YOU` });
    } else if (userMessage.text.match(/:wave:$/)) {
      userMessage.respond({ text: `OMG HI ${userMessage.authorName} :wave: :wave: :wave:`});
    }
  }
}

module.exports = HelloPlugin
