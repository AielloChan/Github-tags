<script>
export default function SendMsg(type, data, callback) {
  chrome.runtime.sendMessage(
    {
      sender: "github-tags",
      type: type,
      data: data
    },
    callback
  );
}
</script>
