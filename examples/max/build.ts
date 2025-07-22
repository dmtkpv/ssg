import type { State } from './types'
import createSSG from '@dmtkpv/ssg/createSSG'

const state: State = {
    version: 1
}

const ssg = await createSSG();
await ssg('/', state);
await ssg('/info', state);