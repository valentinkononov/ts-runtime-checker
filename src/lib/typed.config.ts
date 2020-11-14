import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface TypedOptions {
    enable: boolean;
    throwError: boolean;
    checkArgumentLength: boolean;
    customLogger?: (message: string) => void;
}

/**
 * Defines how @Typed decorator is configured, turned on or off, and other behavior
 */
export class TypedConfig {
    /**
     * Read settings from process.env and generate default settings.
     * Default is: {
     *     enable: true,
     *     throwError: true,
     *     checkArgumentLength: true,
     * }
     */
    private static getInitialOptions(): TypedOptions {
        // console.log('[TypedConfig]: TYPED = ' + process.env.TYPED);
        let envSetting = true;
        if (process.env.TYPED && TypedConfig.parseBoolean(process.env.TYPED) === false) {
            envSetting = false;
        }
        return {
            enable: envSetting,
            throwError: true,
            checkArgumentLength: true,
        };
    }

    private static options: TypedOptions = TypedConfig.getInitialOptions();

    /**
     * Set initial configuration, read settings from process.env
     */
    public static reset() {
        this.options = TypedConfig.getInitialOptions();
    }

    /**
     * Override configuration of Typed decorator
     * Set:
     *      - enable: true or false. It defines should it work or npt
     *      - throwError: true or false. It defines how it should work, log error or throw it
     *      - checkArgumentLength: true or false. It defines should decorator check length of arguments
     */
    public static set(options: TypedOptions) {
        this.options = options;
    }

    public static get(): TypedOptions {
        return this.options;
    }

    private static parseBoolean(value: string): boolean {
        switch (value.toLowerCase().trim()) {
            case 'true':
            case 'yes':
            case '1':
                return true;
            case 'false':
            case 'no':
            case '0':
            case null:
                return false;
            default:
                return Boolean(value);
        }
    }

    // tslint:disable-next-line:ban-types
    public static ExcludeDecorator(decorator: Function) {
        decorator = function () {
            // tslint:disable-next-line:ban-types
            return (target: Object, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
                console.log('test rem');
                return descriptor.value.apply(this, arguments);
            };
        };
    }
}
