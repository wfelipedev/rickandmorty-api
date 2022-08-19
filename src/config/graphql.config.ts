import { GqlModuleOptions } from '@nestjs/graphql';

export const graphqlConfig: GqlModuleOptions = {
  autoSchemaFile: true,
  context: ({ req }) => ({ headers: req.headers }),
  cors: {
    credentials: true,
    origin: true,
  },
};
