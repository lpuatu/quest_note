# Quest Note

A web application that helps writers meet their word count goals through a gamified interface. The application features a health bar that decays over time unless words are typed, encouraging continuous writing.

## Features

- Real-time word count tracking
- Health bar system that decays over time
- Adjustable decay rate settings
- Clean and modern UI
- GitHub Pages deployment support

## Setup

1. Install dependencies:
```bash
poetry install
```

2. Run the development server:
```bash
poetry run python -m quest_note.app
```

The application will be available at http://localhost:5002

## Deployment

The application is deployed to GitHub Pages. The live version can be found at:
https://lpuatu.github.io/quest_note/

## Project Structure

```
quest_note/
├── src/                 # Source code root
│   ├── quest_note/      # Python package
│   │   ├── __init__.py
│   │   └── app.py      # Main application code
│   ├── static/         # Static files (CSS, JS, images)
│   │   └── js/
│   │       └── editor.js
│   └── templates/      # HTML templates
│       └── index.html
├── tests/              # Test files
├── .github/            # GitHub Actions
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── pyproject.toml
├── README.md
└── poetry.lock
```

## License

MIT License