const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static token = null;

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    //fetch API does not throw an error, have to dig into the resp for msgs
    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();

      if( Array.isArray(error.message)){
        throw error.message;
      }
      else{
        console.log(error.message)
        // eslint-disable-next-line
        throw [error.message];
      }

    }

    return await resp.json();
  }

  // Individual API routes

  /********************************** Companies */

  /** Get details on a company by handle.
   * returns { handle, name, description, numEmployees, logoUrl, jobs }
   * where jobs is like [{ id, title, salary, equity }, ...]
   */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies.
   * Takes optional parameter searchTerm to search for companies by name.
   * returns [ company, ... ]
   * where company is like:
   * { handle, name, description, numEmployees, logoUrl }
   */

  static async getCompanies(searchTerm) {
    let data = searchTerm ? { nameLike: searchTerm } : "";

    let res = await this.request(`companies`, data)

    return res.companies;
  }


  /********************************** JOBS */

  /** Get details on a job by id.
   * returns { id, title, salary, equity, company }
   * where company is like { handle, name, description, numEmployees, logoUrl }
   */

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.company;
  }

  /** Get all jobs.
   * Takes optional parameter searchTerm to search for jobs by name
   * returns [ job, ... ]
   * where job is like:
   * { id, title, salary, equity, companyHandle, companyName }
   */

  static async getJobs(searchTerm) {
    let data = searchTerm ? { title: searchTerm } : "";

    let res = await this.request(`jobs`, data);
    return res.jobs;
  }


  /********************************** Auth */

  /** Register a new user
   * Takes a user object like:
   * { username, password, firstName, lastName, email }
   * Returns token.
   */

  static async registerUser(userToRegister) {
    let res = await this.request('auth/register', userToRegister, "POST");

    return res.token;
  }

  /** Login a user
   * Takes a user object like:
   * { username, password }
   * Returns token.
   */

  static async login(userLoginInfo) {
    let res = await this.request('auth/token', userLoginInfo, "POST");

    return res.token;
  }


  /********************************** User */

  /** Get a user's info
   * Takes a user's username.
   * Returns { username, firstName, lastName, email, isAdmin, jobs }
   */

  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update a user's info
   * Takes user like { username, firstName, lastName, email }
   * Returns { username, firstName, lastName, email, isAdmin, jobs }
   * where jobs is { id, title, companyHandle, companyName, state }
   */

  static async updateUser(user) {
    const username = user.username;
    delete user.username;

    let res = await this.request(`users/${username}`, user, "PATCH");
    return res.user;
  }

}

export default JoblyApi;
