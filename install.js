const config = require("./config.js")
const pre = require("./pre.js")
module.exports = async (kernel) => {
  let torch_xformers = pre(config, kernel)
  let script = {
    run: [{
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/cocktailpeanut/SUPIR app",
          //"git clone https://github.com/Fanghua-Yu/SUPIR app",
          //"git clone https://github.com/betapeanut/SUPIR app",
        ]
      }
    }, {
      method: "fs.copy",
      params: {
        src: "CKPT_PTH.py",
        dest: "app/CKPT_PTH.py"
      }
    }, {
      method: "fs.copy",
      params: {
        src: "SUPIR_v0.yaml",
        dest: "app/options/SUPIR_v0.yaml",
      }
//    }, {
//      method: "shell.run",
//      params: {
//        //message: "git clone --depth 1 https://huggingface.co/liuhaotian/llava-v1.5-13b",
//        message: "git clone --depth 1 https://huggingface.co/liuhaotian/llava-v1.5-7b",
//        path: "app"
//      }
    }, {
      method: "shell.run",
      params: {
        venv: "env",
        //conda: "env",
        path: "app",
        message: [
          torch_xformers,
          "pip install -r ../requirements.txt"
        ],
      }
    }, {
      method: "fs.share",
      params: {
        drive: {
          "supir_checkpoints": "app/supir_checkpoints"
        }
      }
    }, {
      method: "fs.share",
      params: {
        drive: {
          "checkpoints": "app/checkpoints"
        },
        peers: [
          "https://github.com/cocktailpeanutlabs/automatic1111.git",
          "https://github.com/cocktailpeanutlabs/fooocus.git",
          "https://github.com/cocktailpeanutlabs/comfyui.git",
          "https://github.com/cocktailpeanutlabs/forge.git"
        ]
      }
    }, {
      method: "fs.share",
      params: {
        venv: "app/env"
      }
    }, {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/cocktailpeanut/sup/resolve/main/SUPIR-v0F.ckpt?download=true",
        dir: "app/supir_checkpoints"
      }
    }, {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/cocktailpeanut/sup/resolve/main/SUPIR-v0Q.ckpt?download=true",
        dir: "app/supir_checkpoints"
      }
    }, {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors",
        dir: "app/checkpoints"
      }
    }, {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }]
  }
  return script
}
