import createSSG from '@dmtkpv/ssg/createSSG'
import tags from './src/tags'

const ssg = await createSSG();
await ssg('/');

for (const { key } of tags) {
    await ssg(`/${key}`, { key });
}

