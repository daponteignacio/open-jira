import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    ok: false;
    message: string | string[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { message = 'Bad Request' } = req.query;

    return res.status(400).json({
        ok: false,
        message
    })
}
