const select=document.querySelector('#idea-game');
const idea=document.querySelector('#idea');
const status=document.querySelector('#idea-status');
document.querySelector('#copy-idea').addEventListener('click',async()=>{
  if(!idea.value.trim()){status.textContent='先说说你想怎么改，再复制。';idea.focus();return;}
  const title=select.selectedOptions[0].textContent;
  const prompt=`请修改 our-game-workshop 里的《${title}》（games/${select.value}）。\n我的想法：${idea.value.trim()}\n请先读 AGENTS.md，只调整这个游戏，保留其他玩法和素材。完成后运行该游戏的测试、构建和浏览器检查，告诉我改好了什么，并准备可以合并发布的修改请求。`;
  try{await navigator.clipboard.writeText(prompt);status.textContent='已复制！打开 Codex 云端的游戏工坊环境，粘贴并发送。';}
  catch{idea.value=prompt;idea.focus();idea.select();status.textContent='请长按选中的文字，选择复制，再到 Codex 云端粘贴。';}
});
