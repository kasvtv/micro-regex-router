const createRouter = require('.');

const routes = [
	{ pattern: '^/testRoute/?$', result: 0 },
	{ pattern: '^/int/(?<intParam>[0-9]+)/?$', result: 1 },
	{ pattern: '^/alphanumeric/(?<strParam>\\w+)/?$', result: 2 },
	{ pattern: '^/duplicated/?$', result: 3 },
	{
		pattern: '^/admin/?$',
		middleware: jest.fn((_, { loggedIn }) => loggedIn),
		result: 4,
	},
	{
		pattern: '^/odd/(?<intParam>[0-9]+)/?$',
		middleware: jest.fn(route => route.intParam % 2 == 1 ? true : { ...route, result: 6 }),
		result: 5,
	},
	{ pattern: new RegExp('^/duplicated/?$'), result: 7 }, // already compiled RegExp's should also work
	{ pattern: '', result: 8 },
];

const router = createRouter(routes);

describe('GIVEN a router created by createRouter', () => {
	describe('WHEN matches nothing', () => {
		it("THEN returns this route's values", () => {
			expect(createRouter([])()).toBeNull();
		});
	});

	describe('WHEN matches a static route', () => {
		it('THEN returns null', () => {
			expect(router('/testRoute').result).toBe(0);
		});
	});

	describe('WHEN multiple routes would match', () => {
		it('THEN matches first one in the array', () => {
			expect(router('/duplicated').result).toBe(3);
		});
	});

	describe('WHEN matches the static part of a route with a numeric parameter', () => {
		describe('WHEN parameter part matches', () => {
			it("THEN returns this route's values", () => {
				const route = router('/int/3');
				expect(route.result).toBe(1);
				expect(route.intParam).toBe('3');
			});
		});

		describe('WHEN parameter part does NOT match', () => {
			it("THEN does NOT return this routes' values", () => {
				const route = router('/int/3a');
				expect(route.result).not.toBe(1);
			});
		});
	});

	describe('WHEN matches the static part of a route with an alphanumeric parameter', () => {
		describe('WHEN parameter part matches', () => {
			it("THEN returns this route's values", () => {
				const route = router('/alphanumeric/asdf123');
				expect(route.result).toBe(2);
				expect(route.strParam).toBe('asdf123');
			});
		});

		describe('WHEN parameter part does NOT match', () => {
			it("THEN does NOT return this routes' values", () => {
				const route = router('/alphanumeric/asdf-123');
				expect(route.result).not.toBe(2);
			});
		});
	});

	describe('WHEN matches a route with middleware', () => {
		it('THEN middleware is called with the would-be return value and extraArgs', () => {
			const middleware = routes.find(route => route.pattern.includes('/admin')).middleware;
			middleware.mockClear();
			router('/admin', { loggedIn: false });
			expect(middleware).toHaveBeenLastCalledWith({ result: 4 }, { loggedIn: false });
		});

		describe('WHEN middleware returns a falsy value', () => {
			it("THEN does NOT return this routes' values", () => {
				const route = router('/admin', { loggedIn: false });
				expect(route.result).not.toBe(4);
			});
		});

		describe('WHEN middleware returns true', () => {
			it("THEN returns this route's values", () => {
				const route = router('/admin', { loggedIn: true });
				expect(route.result).toBe(4);
			});
		});

		describe('WHEN middleware returns object', () => {
			it('THEN returns that object instead', () => {
				expect(router('/odd/1')).toStrictEqual({ intParam: '1', result: 5 });
				expect(router('/odd/2')).toStrictEqual({ intParam: '2', result: 6 });
			});
		});
	});

	describe('WHEN a route with an empty string as a pattern is encountered', () => {
		it('THEN always matches, regardless of input string', () => {
			expect(router('g1bb3r!sh/\\//').result).toBe(8);
		});
	});

});