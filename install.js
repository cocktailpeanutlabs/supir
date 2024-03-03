const config = require("./config.js")
const pre = require("./pre.js")
module.exports = async (kernel) => {
  let script = {
//    requires: [{
//      type: "conda",
//      name: ["cudnn", "libzlib-wapi"],
//      args: "-c conda-forge"
//    }, {
//      type: "conda",
//      name: ["cuda"],
//      args: "-c nvidia/label/cuda-12.1.0"
//    }],
    run: [{
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/cocktailpeanut/SUPIR app",
        ]
      }
    }, {
      method: "shell.run",
      params: {
        message: "git clone https://huggingface.co/liuhaotian/llava-v1.5-13b",
        path: "app"
      }
    }, {
      method: "shell.run",
      params: {
        //venv: "env",
        conda: "env",
        path: "app",
        message: [
          "conda install -y cudatoolkit -c anaconda",
          "pip install -r requirements.txt"
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
//    }, {
//      method: "fs.share",
//      params: {
//        venv: "app/env"
//      }
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
  let pre_command = pre(config, kernel)
  if (pre_command) {
    script.run[1].params.message = [pre_command].concat(script.run[1].params.message)
  }
  return script
}
