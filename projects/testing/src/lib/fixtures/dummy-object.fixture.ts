import { DummyObject } from "../mocks/dummy-object.mock";

export const TEST_DATA: DummyObject[] = [];
for (let i = 0; i < 20; i++) {
    TEST_DATA.push({ id: i.toString() } as DummyObject);
}
