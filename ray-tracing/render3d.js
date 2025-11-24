let wasm;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    }
}

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

export function main() {
    wasm.main();
}

/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}
 */
export const Action = Object.freeze({
    CameraMoveForward: 0, "0": "CameraMoveForward",
    CameraMoveBackward: 1, "1": "CameraMoveBackward",
    CameraMoveLeft: 2, "2": "CameraMoveLeft",
    CameraMoveRight: 3, "3": "CameraMoveRight",
    CameraMoveUp: 4, "4": "CameraMoveUp",
    CameraMoveDown: 5, "5": "CameraMoveDown",
    /**
     * 摄像机水平顺时针转动.
     */
    CameraRotationCW: 6, "6": "CameraRotationCW",
    /**
     * 摄像机水平逆时针转动.
     */
    CameraRotationCCW: 7, "7": "CameraRotationCCW",
    CameraRotationUp: 8, "8": "CameraRotationUp",
    CameraRotationDown: 9, "9": "CameraRotationDown",
    /**
     * 请求进行渲染, 尽管画面没变化.
     */
    RequestRender: 10, "10": "RequestRender",
});
/**
 * @enum {0 | 1 | 2}
 */
export const IntersectKind = Object.freeze({
    Sky: 0, "0": "Sky",
    Ground: 1, "1": "Ground",
    Sphere: 2, "2": "Sphere",
});

const IntersectFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intersect_free(ptr >>> 0, 1));

export class Intersect {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Intersect.prototype);
        obj.__wbg_ptr = ptr;
        IntersectFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntersectFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intersect_free(ptr, 0);
    }
}
if (Symbol.dispose) Intersect.prototype[Symbol.dispose] = Intersect.prototype.free;

const LightFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_light_free(ptr >>> 0, 1));
/**
 * 点光源.
 */
export class Light {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Light.prototype);
        obj.__wbg_ptr = ptr;
        LightFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LightFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_light_free(ptr, 0);
    }
    /**
     * @param {Vec3} pos
     * @param {number} strength
     * @returns {Light}
     */
    static new(pos, strength) {
        _assertClass(pos, Vec3);
        var ptr0 = pos.__destroy_into_raw();
        const ret = wasm.light_new(ptr0, strength);
        return Light.__wrap(ret);
    }
}
if (Symbol.dispose) Light.prototype[Symbol.dispose] = Light.prototype.free;

const RayTracingFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_raytracing_free(ptr >>> 0, 1));
/**
 * 渲染一个 3D 场景(光线追踪), 地面为 z = 0.
 */
export class RayTracing {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RayTracing.prototype);
        obj.__wbg_ptr = ptr;
        RayTracingFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RayTracingFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_raytracing_free(ptr, 0);
    }
    /**
     * @param {Sphere} sphere
     */
    put_sphere(sphere) {
        _assertClass(sphere, Sphere);
        var ptr0 = sphere.__destroy_into_raw();
        wasm.raytracing_put_sphere(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Vec3} pos
     */
    move_camera_to(pos) {
        _assertClass(pos, Vec3);
        var ptr0 = pos.__destroy_into_raw();
        wasm.raytracing_move_camera_to(this.__wbg_ptr, ptr0);
    }
    /**
     * 在此处传入 [`RequestRender`](action::Action::RequestRender) 来让强制绘制一帧.
     *
     * 触发的 action 在 render 之后就会被清空, 如果不想清空, 那么 `set_withdraw_actions_on_render(false)`.
     * @param {Action} action
     */
    trigger_action(action) {
        wasm.raytracing_trigger_action(this.__wbg_ptr, action);
    }
    /**
     * @param {Action} action
     */
    withdraw_action(action) {
        wasm.raytracing_withdraw_action(this.__wbg_ptr, action);
    }
    /**
     * @param {Vec3} gaze
     */
    rotate_camera_to(gaze) {
        _assertClass(gaze, Vec3);
        var ptr0 = gaze.__destroy_into_raw();
        wasm.raytracing_rotate_camera_to(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Uint8Array | undefined}
     */
    render_to_web_color() {
        const ret = wasm.raytracing_render_to_web_color(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {boolean} value
     */
    set_withdraw_actions_on_render(value) {
        wasm.raytracing_set_withdraw_actions_on_render(this.__wbg_ptr, value);
    }
    /**
     * 第一帧绘制 (render) 的时候会返回 `Some(...)`.
     * @param {number} width
     * @param {number} height
     * @param {number} seed
     * @returns {RayTracing}
     */
    static new(width, height, seed) {
        const ret = wasm.raytracing_new(width, height, seed);
        return RayTracing.__wrap(ret);
    }
    /**
     * 渲染画面, 当没有任何操作 ([`Action`](action::Action)) 的时候, 画面没变, 返回 None.
     * @returns {Uint32Array | undefined}
     */
    render() {
        const ret = wasm.raytracing_render(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * @param {Light} light
     */
    put_light(light) {
        _assertClass(light, Light);
        var ptr0 = light.__destroy_into_raw();
        wasm.raytracing_put_light(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) RayTracing.prototype[Symbol.dispose] = RayTracing.prototype.free;

const SphereFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sphere_free(ptr >>> 0, 1));
/**
 * 会镜面反射的球体.
 */
export class Sphere {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Sphere.prototype);
        obj.__wbg_ptr = ptr;
        SphereFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SphereFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sphere_free(ptr, 0);
    }
    /**
     * @param {Vec3} center
     * @param {number} radius
     * @returns {Sphere}
     */
    static new(center, radius) {
        _assertClass(center, Vec3);
        var ptr0 = center.__destroy_into_raw();
        const ret = wasm.light_new(ptr0, radius);
        return Sphere.__wrap(ret);
    }
    /**
     * 球体和从某个点射出的光线求交. 起点在球面内上外估计都能正常计算.
     * @param {Vec3} origin
     * @param {Vec3} direction
     * @returns {Intersect | undefined}
     */
    intersect(origin, direction) {
        const ptr = this.__destroy_into_raw();
        _assertClass(origin, Vec3);
        var ptr0 = origin.__destroy_into_raw();
        _assertClass(direction, Vec3);
        var ptr1 = direction.__destroy_into_raw();
        const ret = wasm.sphere_intersect(ptr, ptr0, ptr1);
        return ret === 0 ? undefined : Intersect.__wrap(ret);
    }
}
if (Symbol.dispose) Sphere.prototype[Symbol.dispose] = Sphere.prototype.free;

const Vec3Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vec3_free(ptr >>> 0, 1));
/**
 * 右手坐标系, z 轴向上.
 */
export class Vec3 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Vec3.prototype);
        obj.__wbg_ptr = ptr;
        Vec3Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Vec3Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vec3_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_vec3_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_vec3_x(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_vec3_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_vec3_y(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get z() {
        const ret = wasm.__wbg_get_vec3_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set z(arg0) {
        wasm.__wbg_set_vec3_z(this.__wbg_ptr, arg0);
    }
    /**
     * 是否是标准化的向量.
     * @returns {boolean}
     */
    is_normalized() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.vec3_is_normalized(ptr);
        return ret !== 0;
    }
    /**
     * 计算两个向量之间的余弦相似度.
     * @param {Vec3} rhs
     * @returns {number}
     */
    cos(rhs) {
        const ptr = this.__destroy_into_raw();
        _assertClass(rhs, Vec3);
        var ptr0 = rhs.__destroy_into_raw();
        const ret = wasm.vec3_cos(ptr, ptr0);
        return ret;
    }
    /**
     * 向量点乘
     * @param {Vec3} rhs
     * @returns {number}
     */
    dot(rhs) {
        const ptr = this.__destroy_into_raw();
        _assertClass(rhs, Vec3);
        var ptr0 = rhs.__destroy_into_raw();
        const ret = wasm.vec3_dot(ptr, ptr0);
        return ret;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {Vec3}
     */
    static new(x, y, z) {
        const ret = wasm.vec3_new(x, y, z);
        return Vec3.__wrap(ret);
    }
    /**
     * 向量叉乘
     * @param {Vec3} rhs
     * @returns {Vec3}
     */
    cross(rhs) {
        const ptr = this.__destroy_into_raw();
        _assertClass(rhs, Vec3);
        var ptr0 = rhs.__destroy_into_raw();
        const ret = wasm.vec3_cross(ptr, ptr0);
        return Vec3.__wrap(ret);
    }
    /**
     * 是否是零向量.
     * @returns {boolean}
     */
    is_zero() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.vec3_is_zero(ptr);
        return ret !== 0;
    }
    /**
     * 获取向量的模长
     * @returns {number}
     */
    magnitude() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.vec3_magnitude(ptr);
        return ret;
    }
    /**
     * 标准化, 不做非 0 模长的保证.
     * @returns {Vec3}
     */
    normalize() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.vec3_normalize(ptr);
        return Vec3.__wrap(ret);
    }
}
if (Symbol.dispose) Vec3.prototype[Symbol.dispose] = Vec3.prototype.free;

const EXPECTED_RESPONSE_TYPES = new Set(['basic', 'cors', 'default']);

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                const validResponse = module.ok && EXPECTED_RESPONSE_TYPES.has(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg___wbindgen_throw_b855445ff6a94295 = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
        const ret = new Error();
        return ret;
    };
    imports.wbg.__wbg_now_0ba04f49f6f78450 = function() {
        const ret = Date.now();
        return ret;
    };
    imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
        const ret = arg1.stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_externrefs;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };

    return imports;
}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('render3d_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
