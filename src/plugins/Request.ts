import axios, {AxiosError, AxiosPromise, AxiosResponse} from "axios";
import {HttpMethod, Rest} from "@/apis/base/Rest";
import router from "@/router";
import {ResultBean} from "@/beans/base/ResultBean";
import {BizError} from "@/exceptions/BizError";
import {Message} from "element-ui";

const request = axios.create({
    baseURL: '/',
    timeout: 3000,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

const PARAM_METHODS = [HttpMethod.GET, HttpMethod.DELETE];

const Request = {
    result<T>(rest: Rest<any>): Promise<ResultBean<T>> {
        return new Promise<ResultBean<T>>(((resolve, reject) => {
            return buildSend<T>(rest)
                .then((res: AxiosResponse) => {
                    resolve(res.data);
                })
                .catch((err: AxiosError) => {
                    handleException(err);
                    reject(err);
                });
        }));
    },
    run<T>(rest: Rest<any>): Promise<T> {

        return new Promise<T>(((resolve, reject) => {
            return buildSend<T>(rest)
                .then((res: AxiosResponse) => {
                    const data = res.data;
                    if (data.code !== 200) {
                        Message.error(data.message);
                        reject(res);
                        return;
                    }
                    resolve(data.data);
                })
                .catch((err: AxiosError) => {
                    handleException(err);
                    reject(err);
                });
        }));
    },
    data<T>(res: ResultBean<T>): T {
        if (!res.success) {
            throw new BizError(res.message);
        }
        return res.data;
    }
};

const buildSend = <T>(rest: Rest<any>): AxiosPromise<T> => {
    const isParam = PARAM_METHODS.includes(rest.method);

    return request({
        url: rest.path,
        method: rest.method,
        params: isParam && rest.param,
        data: !isParam && rest.param,
    });
};

const handleException = (err: AxiosError) => {

    const res = err.response;
    if (!res || !res.status) {
        Message.error('网络异常...');
        return;
    }
    switch (res.status) {
        case 400:
        case 403:
            Message.error(res.data.message);
            break;
        case 404:
            Message.error('有点问题，稍等一下');
            break;
        case 500:
            const message = res.data ? res.data.message : '有点问题，稍等一下';
            Message.error(message);
            break;
        case 401:
            router.replace({
                path: '/login',
                query: {from: router.currentRoute.fullPath}
            });
            break;
        default:
            break;
    }
};

export {Request, request}
