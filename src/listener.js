class Listener {
  constructor(notesService, mailSender) {
    this.notesService = notesService;
    this.mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());
      console.log9(`exporting notes for ${userId} to ${targetEmail}`);

      const notes = await this.notesService.getNotes(userId);
      const result = await this.mailSender.sendEmail(targetEmail, JSON.stringify(notes));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
