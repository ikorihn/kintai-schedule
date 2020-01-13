function createMail(date: Date, to: string, cc: string[], userName: string) {
  const body = getTemplate(date);
  GmailApp.createDraft(to, `【勤怠連絡】${formatDate(date)} ${userName} `, "", {
    cc: cc.join(","),
    htmlBody: body
  });
}

function createSchedule(date: Date, calendarIds: string[], userName: string) {
  CalendarApp.getDefaultCalendar().createAllDayEvent("休暇", date);
  for (const calendarId of calendarIds) {
    CalendarApp.getCalendarById(calendarId).createAllDayEvent(
      `休暇(${userName})`,
      date
    );
  }
}

function getTemplate(date: Date): string {
  const t = HtmlService.createTemplateFromFile("mail_body.html");
  t.date = formatDate(date);
  return t.evaluate().getContent();
}

function formatDate(date: Date): string {
  return Utilities.formatDate(date, "Asia/Tokyo", `M/d(${getWeekDay(date)})`);
}

function getWeekDay(date: Date): string {
  const wNames = ["日", "月", "火", "水", "木", "金", "土"];
  return wNames[date.getDay()];
}

function main() {}
