class UserMessage {
  constructor(attrs) { // {message, author, channel, cabalDetails})
    this.attrs = attrs
  }

  respond({ text }) {
    this.attrs.cabalDetails.publishMessage({
      type: 'chat/text',
      content: { text: text, channel: this.channel }
    });
  }

  get mentionedBot() {
    return this.attrs.message.directMention
  }

  get authorName() {
    return this.attrs.author.name
  }

  get channel() {
    return this.attrs.channel
  }

  get text() {
    return this.attrs.message.value.content.text
  }
}

module.exports = UserMessage;
