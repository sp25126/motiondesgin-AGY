const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const workspaceDir = __dirname;
const targetDir = path.join(workspaceDir, 'public', 'stage_assets');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Copy user uploaded prompt images
const userUploadedDir = 'C:\\Users\\saumy\\.gemini\\antigravity-ide\\brain\\a7a3ce6a-83de-4fd1-83f0-1e989f7b3eb8\\.user_uploaded';
const files = [
  { src: path.join(userUploadedDir, 'media_1792770778676.png'), dest: 'old_homepage.png' },
  { src: path.join(userUploadedDir, 'media_1792770835060.png'), dest: 'new_homepage.png' },
  { src: path.join(userUploadedDir, 'media_1792771077130.png'), dest: 'feedback_andriy.png' },
  { src: path.join(userUploadedDir, 'media_1792771202343.png'), dest: 'feedback_rajat.png' },
  { src: path.join(userUploadedDir, 'media_1792771363779.png'), dest: 'feedback_discord_daymon.png' },
  { src: 'C:\\Users\\saumy\\Downloads\\STAGE_LOGO.png', dest: 'stage_logo.png' },
  { src: 'C:\\Users\\saumy\\Videos\\Captures\\Product Feedback & Feature Requests _ STAGE - Google Chrome 2026-10-23 21-24-42.mp4', dest: 'feedback_page_demo.mp4' },
];

for (const f of files) {
  if (fs.existsSync(f.src)) {
    const destPath = path.join(targetDir, f.dest);
    fs.copyFileSync(f.src, destPath);
    console.log(`[COPIED] ${f.dest} (${(fs.statSync(destPath).size / 1024).toFixed(1)} KB)`);
  } else {
    console.warn(`[NOT FOUND] ${f.src}`);
  }
}

// 2. Copy audio directory from existing generated audio
const audioTarget = path.join(targetDir, 'audio');
if (!fs.existsSync(audioTarget)) {
  fs.mkdirSync(audioTarget, { recursive: true });
}

const existingAudioSrc = 'C:\\Users\\saumy\\.gemini\\OneDrive\\Desktop\\motion design\\antigravity-motion-demo\\public\\stage_assets\\audio';
if (fs.existsSync(existingAudioSrc)) {
  for (const f of fs.readdirSync(existingAudioSrc)) {
    fs.copyFileSync(path.join(existingAudioSrc, f), path.join(audioTarget, f));
    console.log(`[COPIED AUDIO] ${f}`);
  }
}

// 3. Extract Tommy snippet
const tommyDest = path.join(targetDir, 'tommy_snippet.mp4');
const tommyExisting = 'C:\\Users\\saumy\\.gemini\\OneDrive\\Desktop\\motion design\\antigravity-motion-demo\\public\\stage_assets\\tommy_snippet.mp4';
if (fs.existsSync(tommyExisting)) {
  fs.copyFileSync(tommyExisting, tommyDest);
  console.log(`[COPIED] tommy_snippet.mp4`);
} else {
  console.log('Extracting tommy snippet with ffmpeg...');
  cp.execSync(`ffmpeg -y -ss 00:00:02 -i "C:\\Users\\saumy\\Downloads\\stage-website-feedback-on-the-live-page-no-install-review.webm" -t 12 -c:v libx264 -preset fast -c:a aac "${tommyDest}"`);
  console.log('[EXTRACTED] tommy_snippet.mp4');
}

console.log('All files verified in:', targetDir);
for (const item of fs.readdirSync(targetDir)) {
  console.log(' -', item);
}
