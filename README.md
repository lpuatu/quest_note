# Quest Note

A web application that helps writers meet their word count goals through a gamified interface. The application features a health bar that decays over time unless words are typed, encouraging continuous writing.

## Features

- Real-time word count tracking
- Health bar system that decays over time
- Adjustable decay rate settings
- Clean and modern UI
- GitHub Pages deployment support

## Setup

### Install Poetry (for local development)

1. Install Poetry using official installer:
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

2. Verify installation:
```bash
poetry --version
```

### Run the Application

1. Run the local development server:
```bash
poetry run python serve.py
```

The application will be available at http://localhost:8000

## Deployment

The application is deployed to GitHub Pages. The live version can be found at:
https://lpuatu.github.io/quest_note/

## Project Structure

```
quest_note/
├── index.html          # Main application page
├── static/             # Static files
│   ├── css/
│   │   └── style.css  # Application styles
│   └── js/
│       └── editor.js   # Application logic
├── serve.py            # Local development server
├── README.md
└── .gitignore
```

## License