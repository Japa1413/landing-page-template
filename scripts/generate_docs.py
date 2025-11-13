#!/usr/bin/env python3
"""
Script para gerar documentação automaticamente.

Gera documentação a partir de docstrings e atualiza arquivos de documentação.
"""

import ast
import os
import sys
from pathlib import Path
from typing import List, Tuple


def extract_docstrings(file_path: Path) -> List[Tuple[str, str]]:
    """
    Extrai docstrings de um arquivo Python.
    
    Args:
        file_path: Caminho do arquivo Python
        
    Returns:
        List[Tuple[str, str]]: Lista de (nome, docstring)
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        tree = ast.parse(content)
        docstrings = []
        
        for node in ast.walk(tree):
            if isinstance(node, (ast.FunctionDef, ast.ClassDef, ast.Module)):
                docstring = ast.get_docstring(node)
                if docstring:
                    docstrings.append((node.name, docstring))
        
        return docstrings
    except Exception as e:
        print(f"Erro ao processar {file_path}: {e}")
        return []


def check_docstrings(src_dir: Path) -> bool:
    """
    Verifica se funções e classes públicas têm docstrings.
    
    Args:
        src_dir: Diretório fonte
        
    Returns:
        bool: True se todas as funções/classes públicas têm docstrings
    """
    missing_docstrings = []
    
    for py_file in src_dir.rglob("*.py"):
        if py_file.name == "__init__.py":
            continue
        
        docstrings = extract_docstrings(py_file)
        
        # Verifica se há funções/classes sem docstrings
        try:
            with open(py_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            tree = ast.parse(content)
            
            for node in ast.walk(tree):
                if isinstance(node, (ast.FunctionDef, ast.ClassDef)):
                    # Ignora métodos privados
                    if node.name.startswith('_') and not node.name.startswith('__'):
                        continue
                    
                    docstring = ast.get_docstring(node)
                    if not docstring:
                        missing_docstrings.append(
                            f"{py_file.relative_to(src_dir.parent)}::{node.name}"
                        )
        except Exception as e:
            print(f"Erro ao verificar {py_file}: {e}")
    
    if missing_docstrings:
        print("⚠️  Funções/classes sem docstrings:")
        for item in missing_docstrings:
            print(f"  - {item}")
        return False
    
    return True


def generate_docs():
    """Gera documentação do projeto."""
    print("📚 Gerando documentação...")
    
    project_root = Path(__file__).parent.parent
    src_dir = project_root / "src"
    
    if not src_dir.exists():
        print(f"❌ Diretório src não encontrado: {src_dir}")
        sys.exit(1)
    
    # Verifica docstrings
    print("\n🔍 Verificando docstrings...")
    if check_docstrings(src_dir):
        print("✅ Todas as funções/classes públicas têm docstrings")
    else:
        print("⚠️  Algumas funções/classes não têm docstrings")
        # Não falha, apenas avisa
    
    print("\n✅ Documentação verificada!")
    print("\n💡 Para gerar documentação completa com Sphinx:")
    print("   sphinx-build -b html docs/ docs/_build/html")


if __name__ == "__main__":
    generate_docs()

