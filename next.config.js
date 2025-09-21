/** @type {import('next').NextConfig} */
const nextConfig = {
    // Desabilitar geração de trace
    generateBuildId: () => 'build',
    experimental: {
        serverActions: true
    },
    // Não rastrear telemetria
    telemetry: {
        telemetryDisabled: true
    }
}

module.exports = nextConfig