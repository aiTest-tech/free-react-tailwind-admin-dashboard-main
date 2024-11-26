import {z} from 'zod';

export const AuthSchema = z.object(
    {
        email: z.string().min(1, {message: "This field has to be filled."}).email("This is not a "),
        password: z.string().min(4),
    }
)

export type AuthType = z.infer<typeof AuthSchema>;