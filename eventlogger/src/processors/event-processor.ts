import { SystemEvent } from '@rickjms/microservices-common';
import { SystemEvent as SystemEventModel } from '../models/system-event';

const processEvent = async (event: SystemEvent['data']) => {
  const systemEvent = SystemEventModel.build({
    ...event,
  });
  console.log('Saving event:', systemEvent.eventId);
  await systemEvent.save();
  console.log('Event saved successfully');
};

export default { processEvent };
