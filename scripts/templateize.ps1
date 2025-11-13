# Script para transformar o projeto em template genérico
# Remove dados sensíveis e substitui por placeholders

Write-Host "🔄 Transformando projeto em template genérico..." -ForegroundColor Cyan
Write-Host ""

$files = @(
    "index.html",
    "manifest.json",
    "sitemap.xml"
)

# Substituições a fazer
$replacements = @{
    # Nomes e títulos
    "Dra\. Suelen Silva Máximo" = "Nome do Profissional"
    "Dra\. Suelen Máximo" = "Nome do Profissional"
    "Suelen Silva Máximo" = "Nome do Profissional"
    "Suelen Máximo" = "Nome do Profissional"
    
    # OAB e registro
    "OAB/DF 27400" = "OAB/XX 00000"
    "OAB DF 27400" = "OAB XX 00000"
    "27400" = "00000"
    
    # Localizações
    "Sobradinho" = "Cidade 1"
    "Asa Sul" = "Cidade 2"
    "Sobradinho e Asa Sul" = "Cidade 1 e Cidade 2"
    "Sobradinho - DF" = "Cidade 1 - Estado"
    "Asa Sul - DF" = "Cidade 2 - Estado"
    "Brasília" = "Cidade Principal"
    
    # URLs e domínios
    "suelenmaximo\.com\.br" = "exemplo.com.br"
    "www\.suelenmaximo\.com\.br" = "www.exemplo.com.br"
    "https://www\.suelenmaximo\.com\.br" = "https://www.exemplo.com.br"
    
    # Contatos
    "contato@suelenmaximo\.com\.br" = "contato@exemplo.com.br"
    "5561999999999" = "5500000000000"
    "\(61\) 99999-9999" = "(00) 00000-0000"
    "\+55-61-99999-9999" = "+55-00-00000-0000"
    
    # Redes sociais
    "@suelenmaximo" = "@usuario"
    "instagram\.com/suelenmaximo" = "instagram.com/usuario"
    "https://instagram\.com/suelenmaximo" = "https://instagram.com/usuario"
    
    # Imagens
    "suelen-foto\.jpg" = "professional-photo.jpg"
    
    # Descrições genéricas
    "Advogada OAB/DF 27400" = "Profissional - Registro XX 00000"
    "advogada DF" = "profissional"
    "advogada Sobradinho" = "profissional Cidade 1"
    "advogada Asa Sul" = "profissional Cidade 2"
}

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "📝 Processando: $file" -ForegroundColor Yellow
        $content = Get-Content $file -Raw -Encoding UTF8
        
        foreach ($key in $replacements.Keys) {
            $content = $content -replace $key, $replacements[$key]
        }
        
        Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
        Write-Host "   ✅ Concluído" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "✅ Template criado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Revise os arquivos modificados" -ForegroundColor White
Write-Host "   2. Edite config.template.json com suas informações" -ForegroundColor White
Write-Host "   3. Execute o script de configuração" -ForegroundColor White

