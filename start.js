module.exports = async (kernel) => {
  let script = {
    daemon: true,
    run: [{
      method: "shell.run",
      params: {
        path: "app",
        venv: "env",
        message: [
          "python gradio_demo.py --use_image_slider --log_history --loading_half_params --use_tile_vae --load_8bit_llava",
          //"python gradio_demo.py --use_image_slider --log_history --loading_half_params --use_tile_vae --no_llava"
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
