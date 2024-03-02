module.exports = async (kernel) => {
  let script = {
    daemon: true,
    run: [{
      method: "shell.run",
      params: {
        path: "app",
        venv: "env",
        env: {
          "SDXL_CKPT": "{{path.resolve(cwd, 'app/checkpoints/sd_xl_base_1.0.safetensors')}}",
          "SUPIR_CKPT_F": "{{path.resolve(cwd, 'app/supir_checkpoints/SUPIR-v0F.ckpt')}}",
          "SUPIR_CKPT_Q": "{{path.resolve(cwd, 'app/supir_checkpoints/SUPIR-v0Q.ckpt')}}",
          "LLAVA_MODEL_PATH": "{{path.resolve(cwd, 'app/llava-v1.5-13b')}}"
        },
        message: [
          "python gradio_demo.py",
        ],
        on: [{ "event": "/http:\/\/[0-9.:]+/", "done": true }]
      }
    }, {
      "method": "local.set",
      "params": {
        "url": "{{input.event[0]}}"
      }
    }, {
      "method": "proxy.start",
      "params": {
        "uri": "{{local.url}}",
        "name": "Local Sharing"
      }
    }]
  }
  return script
}
