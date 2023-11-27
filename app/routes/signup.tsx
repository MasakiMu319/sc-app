import { Form, Link, useLoaderData } from "@remix-run/react";
import {json} from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const error = url.searchParams.get("error");
    return json({ error });
};

export default function Signup() {
    const { error } = useLoaderData();

    return (
        <div>
            <h1>Signup</h1>
            {error && <p>{error}</p>}
            <Form method="post" action="/signup">
                <label>
                    Username:
                    <input type="text" name="username" required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" required />
                </label>
                <button type="submit">Sign up</button>
            </Form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}