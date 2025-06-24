// services/utils.ts
const WLLAMA_WASM_PATH_FIREFOX = './wllama.wasm';

const WLLAMA_ESM_PATH = '../node_modules/@wllama/wllama/esm/';

const WLLAMA_CONFIG_PATHS = {
  'single-thread/wllama.wasm': WLLAMA_ESM_PATH + 'single-thread/wllama.wasm',
  'multi-thread/wllama.wasm': WLLAMA_ESM_PATH + 'multi-thread/wllama.wasm'
};

export async function getWllamaConfigPath(
  source: 'firefox' | 'original'
): Promise<Record<
  'single-thread/wllama.wasm' | 'multi-thread/wllama.wasm', string
>> {
  let wasmUrl: string;

  if (source === 'firefox') {
    const response = await fetch(WLLAMA_WASM_PATH_FIREFOX);
    const wasm = await response.arrayBuffer();

    wasmUrl = URL.createObjectURL(
      new Blob([wasm], { type: "application/wasm" })
    );

    const configPaths = {
      "single-thread/wllama.wasm": "",
      "multi-thread/wllama.wasm": wasmUrl
    };
    return configPaths;
  } else {
    return WLLAMA_CONFIG_PATHS;
  }
}

export function modelDownloadCallback(progress: { loaded: number, total: number }) {
  console.log(`Loading model: ${Math.round((progress.loaded / progress.total) * 100)}%`);
}