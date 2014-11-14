define([
    'js-whatever/js/escape-regex'
], function (escapeRegex) {
    describe('Utility: escapeRegex', function () {

        it('should escape alternation operator', function () {
            var reg = new RegExp(escapeRegex('a|b'), 'i');
            expect(reg.test('cat')).toBeFalsy();
            expect(reg.test('a|b')).toBeTruthy();
            expect(reg.test('asdva|basdvasd')).toBeTruthy();
        });

        it('should escape correctly', function () {
            var chars = '\\^$*+-?.(){}[]|';
            var charsList = chars.split('');
            _.times(255, function (code) {
                var character = String.fromCharCode(code);
                if (_.contains(charsList, character)) {
                    expect(escapeRegex(character)).toBe('\\' + character);
                } else {
                    expect(escapeRegex(character)).toBe(character);
                }
            })
        });

        it('should not break on unicode', function () {
            var character = '\u263A';
            expect(escapeRegex(character)).toBe(character);
        });
    });
});