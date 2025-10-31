const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Testing Email Sender Backend...\n');

// Check if TypeScript is compiled
const distPath = path.join(__dirname, 'dist', 'server.js');
const fs = require('fs');

if (!fs.existsSync(distPath)) {
    console.log('📦 Building TypeScript...');
    const buildProcess = spawn('npm', ['run', 'server:build'], { 
        stdio: 'inherit',
        shell: true 
    });
    
    buildProcess.on('close', (code) => {
        if (code === 0) {
            console.log('✅ Build successful');
            testServer();
        } else {
            console.log('❌ Build failed');
            process.exit(1);
        }
    });
} else {
    testServer();
}

function testServer() {
    console.log('🚀 Starting server for testing...');
    
    const serverProcess = spawn('node', ['dist/server.js'], {
        stdio: 'pipe',
        shell: true
    });
    
    let output = '';
    
    serverProcess.stdout.on('data', (data) => {
        output += data.toString();
        console.log(data.toString());
        
        // Check if server started successfully
        if (output.includes('Email server running on port')) {
            console.log('\n✅ Server started successfully!');
            console.log('🛑 Stopping test server...');
            serverProcess.kill();
            process.exit(0);
        }
    });
    
    serverProcess.stderr.on('data', (data) => {
        console.error('❌ Server error:', data.toString());
    });
    
    // Timeout after 10 seconds
    setTimeout(() => {
        console.log('⏰ Test timeout - server may not have started properly');
        serverProcess.kill();
        process.exit(1);
    }, 10000);
    
    serverProcess.on('close', (code) => {
        if (code === 0) {
            console.log('✅ Test completed successfully');
        } else {
            console.log('❌ Test failed');
            process.exit(1);
        }
    });
} 