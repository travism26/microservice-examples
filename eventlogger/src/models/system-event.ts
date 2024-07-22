import mongoose from 'mongoose';

interface SystemEventAttrs {
  eventId: string;
  timestamp: Date;
  eventType: string;
  userId?: string;
  username?: string;
  sourceIp?: string;
  eventDescription: string;
  serviceName: string;
  severityLevel: string;
  location?: string;
  correlationId?: string;
  requestId?: string;
  responseStatus?: string;
  payload?: string;
  userAgent?: string;
  sessionId?: string;
  applicationVersion: string;
  additionalMetadata?: object;
}

interface SystemEventModel extends mongoose.Model<SystemEventDoc> {
  build(attrs: SystemEventAttrs): SystemEventDoc;
}

interface SystemEventDoc extends mongoose.Document {
  eventId: string;
  timestamp: Date;
  eventType: string;
  userId?: string;
  username?: string;
  sourceIp?: string;
  eventDescription: string;
  serviceName: string;
  severityLevel: string;
  location?: string;
  correlationId?: string;
  requestId?: string;
  responseStatus?: string;
  payload?: string;
  userAgent?: string;
  sessionId?: string;
  applicationVersion: string;
  additionalMetadata?: object;
}

const SystemEventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  username: {
    type: String,
  },
  sourceIp: {
    type: String,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  severityLevel: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  correlationId: {
    type: String,
  },
  requestId: {
    type: String,
  },
  responseStatus: {
    type: String,
  },
  payload: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  sessionId: {
    type: String,
  },
  applicationVersion: {
    type: String,
    required: true,
  },
  additionalMetadata: {
    type: mongoose.Schema.Types.Mixed,
  },
});

SystemEventSchema.statics.build = (attrs: SystemEventAttrs) => {
  return new SystemEvent(attrs);
};

const SystemEvent = mongoose.model<SystemEventDoc, SystemEventModel>(
  'SystemEvent',
  SystemEventSchema
);

export { SystemEvent };
