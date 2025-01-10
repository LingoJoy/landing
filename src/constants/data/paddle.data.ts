export const DEFAULT_IRREGULAR_DATA = {
    items: [
        {
            priceId: import.meta.env.VITE_PADDLE_IRREGULAR,
            quantity: 1,
        },
    ],
    discountId: import.meta.env.VITE_PADDLE_IRREGULAR_DISCOUNT,
};

export const DEFAULT_NOTEBOOK_DATA = {
    items: [
        {
            priceId: import.meta.env.VITE_PADDLE_NOTEBOOK,
            quantity: 1,
        },
    ],
    discountId: import.meta.env.VITE_PADDLE_NOTEBOOK_DISCOUNT,
};

export const DEFAULT_COURSE_DATA = {
    items: [
        {
            priceId: import.meta.env.VITE_PADDLE_COURSE,
            quantity: 1,
        },
    ],
    discountId: import.meta.env.VITE_PADDLE_COURSE_DISCOUNT,
};

export const DEFAULT_ALL_DATA = {
    items: [
        {
            priceId: import.meta.env.VITE_PADDLE_ALL,
            quantity: 1,
        },
    ],
    discountId: import.meta.env.VITE_PADDLE_ALL_DISCOUNT,
};

export const DEFAULT_PADDLE_PLAN_DATA = [
    {
        items: [
            {
                priceId: import.meta.env.VITE_PADDLE_PLAN_1_1,
                quantity: 1,
            },
            {
                priceId: import.meta.env.VITE_PADDLE_PLAN_1,
                quantity: 1,
            },
        ],
    },
    {
        items: [
            {
                priceId: import.meta.env.VITE_PADDLE_PLAN_2,
                quantity: 1,
            },
        ],
        discountId: import.meta.env.VITE_PADDLE_PLAN_DISCOUNT_2,
    },
    {
        items: [
            {
                priceId: import.meta.env.VITE_PADDLE_PLAN_3,
                quantity: 1,
            },
        ],
        discountId: import.meta.env.VITE_PADDLE_PLAN_DISCOUNT_3,
    },
];
