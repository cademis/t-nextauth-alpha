# Instructions

follow this guide https://www.youtube.com/watch?v=1MTyCvS05V4&list=PPSV

# Notes

This is some top quality content, Antonio!

With regards to the user object at 2:56:32, it is undefined because it contains the result of the authorize callback within the authConfig, meaning that it will only ever have a value once during signIn, after which it is undefined.

Since the value of the session is set during signIn, you can just use the user object instead of making a request to the database again in the jwt callback.

Hope this helps, and thank you for awesome content!

And regarding extending the user (3:11:02) and the token (3:13:48), this works:

```
import { User } from "@auth/core/types";
import { JWT } from "@auth/core/jwt";


declare module "@auth/core/types" {
  interface User {
    // add your custom fields here
  }

  interface Session {
    user: User;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    // add your custom fields here
  }
}
```

The issue with your implementation of the token custom field is that you are making it optional by adding the '?', meaning it is either "ADMIN" | "USER" | undefined, which does not match what you have in the user.role field (it is not optional).

So either make them both optional, or both required, and it should work.

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
