import { getRepository } from "typeorm";

import Category from "../../src/entities/Category";

interface CategoryCreate {
    name: string;
}

export async function createCategory(category: CategoryCreate) {
    await getRepository(Category).insert(category);
}