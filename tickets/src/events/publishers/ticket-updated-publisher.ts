import { Publisher, Subjects, TicketUpdatedEvent } from "@sgstubhub/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
