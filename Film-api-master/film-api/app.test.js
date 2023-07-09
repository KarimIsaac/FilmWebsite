const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  it('should respond with 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
describe('GET /film/:title', () => {
  it('should respond with 200 status code and render the film template', async () => {
    const films = require('./films.json');
    const film = films[0]; 

    const response = await request(app).get(`/film/${film.title}`);
    expect(response.status).toBe(200);
    expect(response.text).toContain(film.title);
    expect(response.text).toContain(film.director);
    
  });

  it('should respond with 404 status code for a non-existing film', async () => {
    const response = await request(app).get('/film/nonexistent');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Film not found');
  });
});