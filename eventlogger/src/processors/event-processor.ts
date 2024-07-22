import { SystemEvent } from '@rickjms/microservices-common';
import { SystemEvent as SystemEventModel } from '../models/system-event';

const processEvent = async (event: SystemEvent['data']) => {
  console.log('Event data:', event);
  const systemEvent = SystemEventModel.build({
    ...event,
  });
  console.log('Saving event:', systemEvent);
  await systemEvent.save();
  console.log('Event saved successfully');
};

export default { processEvent };
