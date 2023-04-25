import { Publisher, Subjects, TicketCreatedEvent } from "@sgstubhub/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
