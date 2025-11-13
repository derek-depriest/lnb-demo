# Real-Time Collaborative Markdown Wiki

## Goal
Build a lightweight wiki where multiple users can edit markdown pages simultaneously. Think "Google Docs meets developer notes" with real-time collaboration and conflict resolution.

## Tech Stack
- **Frontend**: Vite + React + TypeScript
- **Backend**: ASP.NET Core minimal API with SignalR
- **Styling**: TailwindCSS
- **Markdown**: marked.js or react-markdown for rendering
- **Storage**: In-memory or SQLite for persistence
- **Real-time**: SignalR for WebSocket communication

## Core Features
1. **Page Tree**: Hierarchical list of wiki pages
2. **Markdown Editor**: Split view - edit markdown on left, rendered on right
3. **Real-time Sync**: See other users' cursors and edits live
4. **Version Awareness**: Show who's editing what
5. **Simple Conflict Resolution**: Last-write-wins or operational transforms

## Quick Start

### Frontend
```bash
npm create vite@latest wiki-frontend -- --template react-ts
cd wiki-frontend
npm install
npm install @microsoft/signalr marked tailwindcss autoprefixer postcss
npm install react-markdown
npx tailwindcss init -p
```

### Backend
```bash
dotnet new web -n WikiBackend
cd WikiBackend
dotnet add package Microsoft.AspNetCore.SignalR
```

## SignalR Hub Structure

### Backend Hub
```csharp
public class WikiHub : Hub
{
    // Notify all clients when someone starts editing
    public async Task JoinPage(string pageId, string userName) { }
    
    // Broadcast edits to all clients on the same page
    public async Task SendEdit(string pageId, string content, int cursorPosition) { }
    
    // Handle page creation/deletion
    public async Task CreatePage(string title, string parentId) { }
}
```

### Frontend Connection
```typescript
const connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5000/wikihub")
    .withAutomaticReconnect()
    .build();

connection.on("ReceiveEdit", (content, userId, cursorPosition) => {
    // Update editor content
});
```

## Data Model
Keep it simple:
```typescript
interface WikiPage {
    id: string;
    title: string;
    content: string;
    parentId?: string;
    lastModified: Date;
    currentEditors: string[];
}
```

## Development Approach
1. Build basic ASP.NET Core SignalR hub
2. Create React frontend with SignalR connection
3. Implement single-page editing with markdown preview
4. Add page tree navigation
5. Wire up real-time broadcasting of edits
6. Add user presence indicators (who's viewing/editing)
7. Implement basic conflict handling

## Collaboration Strategy

### Simple Approach (Fastest)
- Last-write-wins: Whoever saves most recently overwrites
- Show "X is editing" indicator to warn users
- Lock editing when someone else is active

### Advanced Approach (If Time Allows)
- Operational transforms: Merge concurrent edits
- Character-by-character sync with debouncing
- Show multiple cursors with user colors

## Stretch Goals
- Search across all pages
- Markdown syntax shortcuts (WYSIWYG toolbar)
- Page templates (meeting notes, design docs)
- Export page as PDF or HTML
- Code block syntax highlighting
- Image upload and embedding
- Page linking with `[[wiki-link]]` syntax

## Notes
- For demo purposes, generate random user names or use simple text input
- Store everything in-memory initially; add SQLite if persistence is needed
- Run backend on port 5000, frontend on 5173 (Vite default)
