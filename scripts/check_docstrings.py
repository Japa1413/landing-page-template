#!/usr/bin/env python3
"""
Script para verificar docstrings em funções públicas.

Usado em pre-commit hooks para garantir que código público
está documentado.
"""

import ast
import sys
from pathlib import Path


def check_file_docstrings(file_path: Path) -> list:
    """
    Verifica docstrings em um arquivo.
    
    Args:
        file_path: Caminho do arquivo
        
    Returns:
        list: Lista de funções/classes sem docstrings
    """
    missing = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        tree = ast.parse(content)
        
        for node in ast.walk(tree):
            if isinstance(node, (ast.FunctionDef, ast.ClassDef)):
                # Ignora métodos privados
                if node.name.startswith('_') and not node.name.startswith('__'):
                    continue
                
                # Ignora métodos especiais (__init__, __str__, etc)
                if node.name.startswith('__') and node.name.endswith('__'):
                    continue
                
                docstring = ast.get_docstring(node)
                if not docstring:
                    missing.append(node.name)
    
    except Exception as e:
        print(f"Erro ao processar {file_path}: {e}", file=sys.stderr)
    
    return missing


def main():
    """Função principal."""
    project_root = Path(__file__).parent.parent
    src_dir = project_root / "src"
    
    if not src_dir.exists():
        print("❌ Diretório src não encontrado", file=sys.stderr)
        sys.exit(1)
    
    all_missing = []
    
    for py_file in src_dir.rglob("*.py"):
        if py_file.name == "__init__.py":
            continue
        
        missing = check_file_docstrings(py_file)
        if missing:
            rel_path = py_file.relative_to(project_root)
            for item in missing:
                all_missing.append(f"{rel_path}::{item}")
    
    if all_missing:
        print("❌ Funções/classes públicas sem docstrings encontradas:")
        for item in all_missing:
            print(f"  - {item}")
        print("\n💡 Adicione docstrings a todas as funções e classes públicas.")
        sys.exit(1)
    
    print("✅ Todas as funções/classes públicas têm docstrings")
    sys.exit(0)


if __name__ == "__main__":
    main()

