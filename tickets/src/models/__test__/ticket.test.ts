import { Ticket } from "../ticket";

it('impliments optimistic concurrency control', async () => {
  // create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123'
  });

  // save the ticket to the databse
  await ticket.save();

  // fetch the twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstace = await Ticket.findById(ticket.id)

  // make two seprate changes to the tickets we fetched
  firstInstance?.set({ price: 10 });
  secondInstace!.set({ price: 15 });

  // save the first fetched ticket
  await firstInstance!.save();

  // save the second fetched ticket and expect an error
  try {
    await secondInstace!.save();
  } catch (err) {
    return;
  }
  
  throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123'
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);

})