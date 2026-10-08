// Same-origin Ogg Vorbis encoder loader.
// Loads the minified encoder plus its memory image without any CDN dependency.
window.__oggEncoderLoadError='';
window.__oggEncoderReady=(async()=>{
  try{
    const r=await fetch('./OggVorbisEncoder.min.js.mem.b64',{cache:'force-cache'});
    if(!r.ok)throw Error('OGGエンコーダーのメモリデータを読み込めません (HTTP '+r.status+')');
    const b64=(await r.text()).replace(/\s/g,'');
    const bin=atob(b64),mem=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)mem[i]=bin.charCodeAt(i);
    window.OggVorbisEncoderConfig={memoryInitializerRequest:{response:mem.buffer}};
    await new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src='./OggVorbisEncoder.min.js';
      s.onload=resolve;
      s.onerror=()=>reject(Error('OggVorbisEncoder.min.js の読み込みに失敗しました'));
      document.head.appendChild(s);
    });
    if(typeof window.OggVorbisEncoder!=='function')throw Error('OGG変換エンジンが初期化されませんでした');
  }catch(e){
    window.__oggEncoderLoadError=(e&&e.message)||String(e);
    throw e;
  }
})();