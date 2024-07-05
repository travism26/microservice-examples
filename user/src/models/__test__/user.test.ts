import { User } from '../user';

it('implements optimistic concurrency control', async () => {
  // Create an instance of a user
  const user = User.build({
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'User',
  });
  // Save the user to the database
  await user.save();
  // Fetch the user twice
  const firstInstance = await User.findById(user.id);
  const secondInstance = await User.findById(user.id);
  // Make two separate changes to the users we fetched
  firstInstance!.set({ firstName: 'New Test' });
  secondInstance!.set({ firstName: 'Another Test' });
  // Save the first fetched user
  await firstInstance!.save();
  // Save the second fetched user and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    console.log(err);
    return;
  }
  throw new Error('Should not reach this point');
});
