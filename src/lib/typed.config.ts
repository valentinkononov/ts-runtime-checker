import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface TypedOptions {
    enable: boolean;
    throwError: boolean;
    checkArgumentLength: boolean;
}

export class TypedConfig {

    private static getDefaultOptions(): TypedOptions {
        let envSetting: boolean = true;
        if (process.env.TYPED && TypedConfig.parseBoolean(process.env.TYPED) === false) {
            envSetting = false;
        }
        return {
            enable: envSetting,
            throwError: true,
            checkArgumentLength: true,
        }
    }
    private static options: TypedOptions = TypedConfig.getDefaultOptions();

    public static set(options: TypedOptions) {
        this.options = options;
    }

    public static get(): TypedOptions {
        return this.options;
    }

    private static parseBoolean(value: string): boolean {
        switch(value.toLowerCase().trim()){
            case "true": case "yes": case "1": return true;
            case "false": case "no": case "0": case null: return false;
            default: return Boolean(value);
        }
    }
}
