# Airport Management System Backend

A comprehensive NestJS backend for managing three airports (Sham Airport, Emirates Airport, and Qatar Airport), each with its own database system.

## Database Structure

- **Sham Airport**: MongoDB
- **Emirates Airport**: PostgreSQL
- **Qatar Airport**: MySQL

## Features

- Multi-database architecture
- Authentication system with JWT
- User account management
- Airport information and statistics
- Flight management for each airport
- Booking system with seat selection
- Cross-airport flight search
- User favorites and search history
- Swagger API documentation

## Prerequisites

- Node.js (v16+)
- MongoDB
- PostgreSQL
- MySQL

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Create and configure your `.env` file based on the provided `.env.example`
4. Start the databases:

```bash
# Make sure your MongoDB, PostgreSQL, and MySQL servers are running
```

5. Start the application:

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Documentation

Once the server is running, you can access the Swagger API documentation at:

```
http://localhost:3000/api
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### User Management

- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/favorites` - Add airport to favorites
- `DELETE /api/users/favorites/{airportId}` - Remove airport from favorites
- `POST /api/users/search-history` - Add recent search

### Airports

- `GET /api/airports` - Get all airports
- `GET /api/airports/{id}` - Get airport by ID
- `GET /api/airports/dashboard/stats` - Get dashboard statistics
- `GET /api/airports/search/flights` - Search flights across all airports

### Sham Airport (MongoDB)

- `GET /api/airports/sham/flights` - Get all flights
- `GET /api/airports/sham/flights/{id}` - Get flight by ID
- `POST /api/airports/sham/flights` - Create a new flight
- `PUT /api/airports/sham/flights/{id}` - Update flight
- `DELETE /api/airports/sham/flights/{id}` - Delete flight
- `GET /api/airports/sham/bookings` - Get all bookings
- `POST /api/airports/sham/bookings` - Create a new booking
- `PUT /api/airports/sham/bookings/{id}/status` - Update booking status
- `DELETE /api/airports/sham/bookings/{id}/cancel` - Cancel booking
- `GET /api/airports/sham/flights/{id}/bookings` - Get all bookings for a flight

### Emirates Airport (PostgreSQL)

- Similar endpoints as Sham Airport but with `/api/airports/emirates` prefix

### Qatar Airport (MySQL)

- Similar endpoints as Sham Airport but with `/api/airports/qatar` prefix

## Architecture

This project follows NestJS's modular architecture:

- **App Module**: Main application module that integrates all other modules and provides the overall configuration
- **Config Module**: Configuration for environment variables, database connections, and JWT settings
- **Auth Module**: Authentication and authorization services using JWT tokens
- **Users Module**: User management with MongoDB for user data storage
- **Airports Module**: General airport functionality across all three airports, with cross-airport search capability
- **Sham Module**: Specific implementation for Sham Airport using MongoDB
- **Emirates Module**: Specific implementation for Emirates Airport using PostgreSQL
- **Qatar Module**: Specific implementation for Qatar Airport using MySQL

Each airport module (Sham, Emirates, Qatar) follows a similar structure with:
- Entity/Schema definitions
- DTOs for data validation
- Services for business logic
- Controllers for API endpoints

## Database Relationships

The project includes:
- Flights and Bookings relationships in each database
- User preferences and history tracking
- Cross-database querying through the common API layer

## Extending the Project

To extend this project:

1. Add new features to existing modules
2. Create new modules for additional functionality
3. Expand cross-airport features through the Airports module
4. Add additional airport databases by following the existing patterns

## Additional Features for Future Development

- Real-time flight status updates
- Payment processing integration
- Email notification system
- Admin dashboard
- Reporting and analytics
- Mobile app API extensions

## Deployment

For deployment to production:

1. Set up PostgreSQL, MySQL, and MongoDB in your production environment
2. Configure production environment variables
3. Build the NestJS application
4. Deploy using Docker, Kubernetes, or your preferred hosting platform

## Security Considerations

- All routes except registration, login, and public airport information require authentication
- Passwords are hashed using bcrypt
- JWT tokens are used for secure API authentication
- Environment variables are used for sensitive configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with your changes

## License

MIT