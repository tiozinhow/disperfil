"""Atualiza o 404.html a partir do index.html.

O GitHub Pages serve 404.html em caminhos como /belly; como o app lê o
caminho, a cópia precisa ter o mesmo HTML/JS do index.
"""

from pathlib import Path

root = Path(__file__).parent
source = root / "index.html"
target = root / "404.html"
target.write_bytes(source.read_bytes())
print(f"{target.name} atualizado a partir de {source.name}")
