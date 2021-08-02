import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html {
        height: 100%;
        width: 100%;
    }

    body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        font-family: ${({ theme }) => theme.fonts.text};
        color: ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.background};
    }

    #root {
        width: 100%;
        height: 100%;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }

	p {
		margin: 0;
	}

	a {
		text-decoration: none;
		color: ${({ theme }) => theme.colors.primary};
		font-variation-settings: "wght" 600;
	}

    button {
        border: 0;
        margin: 0;
        outline: 0;
    }

    input, textarea {
        outline: 0;
        border: 0;
        font-family: ${({ theme }) => theme.fontFamily};
    }

	/**
		Toast
	**/
	.Toastify__toast--error {
		background-color: ${({ theme }) => theme.colors.error} !important;
	}

	.Toastify__toast--dark {
		background-color: ${({ theme }) => theme.colors.black} !important;
	}

	.Toastify__progress-bar--dark {
		background-color: ${({ theme }) => theme.colors.primary} !important;
	}

	/**
	 RFU
	**/
	[class*=" rfu-"],
	[class^="rfu-"] {
		font-family: Avenir, Arial, Helvetica, sans-serif;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	.rfu-file-previewer {
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		overflow: hidden;
		margin: 8px 0;
		position: relative;
	}
	.rfu-file-previewer ol {
		position: relative;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.rfu-file-previewer ol li {
		position: relative;
		padding: 8px 16px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	.rfu-file-previewer ol li:last-child {
		border-color: transparent;
	}
	.rfu-file-previewer__file {
		position: relative;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		cursor: pointer;
	}
	.rfu-file-previewer__file:hover {
		background: #fafafa;
	}
	.rfu-file-previewer__file a {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		margin: 0 8px;
		color: #414d54;
		text-decoration: none;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.rfu-file-previewer__file svg {
		min-width: 25px;
	}
	.rfu-file-previewer__file--uploading {
		opacity: 0.4;
	}
	.rfu-file-previewer__file--failed a {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		color: #8b9297;
	}
	.rfu-file-previewer__file--failed a:after {
		text-decoration: none;
	}
	.rfu-file-previewer__image {
		min-width: 25px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	.rfu-file-previewer__loading-indicator {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		z-index: 1000;
	}
	.rfu-file-previewer__close-button {
		position: relative;
		z-index: 10000;
	}
	.rfu-file-previewer__failed {
		background: #ff6363;
	}
	.rfu-file-previewer__failed,
	.rfu-file-previewer__retry {
		padding: 3px 6px;
		margin-left: 8px;
		color: #fff;
		border-radius: 4px;
		font-size: 12px;
	}
	.rfu-file-previewer__retry {
		text-decoration: none;
		background: #63e5a4;
	}
	.rfu-file-upload-button {
		cursor: pointer;
	}
	.rfu-file-upload-button svg {
		fill: #a0b2b8;
	}
	.rfu-file-upload-button:hover svg {
		fill: #88979c;
	}
	.rfu-file-upload-button label {
		cursor: pointer;
	}
	.rfu-file-upload-button .rfu-file-input {
		width: 0;
		height: 0;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	}
	.rfu-icon-button {
		cursor: pointer;
		position: relative;
		padding: 4px;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
	}
	.rfu-icon-button svg {
		margin: 4px;
		position: relative;
		z-index: 50;
		fill: #a0b2b8;
	}
	.rfu-icon-button:hover svg {
		fill: #88979c;
	}
	.rfu-dropzone .rfu-dropzone__notifier {
		position: absolute;
		height: 100%;
		width: 100%;
		padding: 30px;
		z-index: 90;
		display: none;
		border-radius: 4px;
	}
	.rfu-dropzone--accept .rfu-dropzone__notifier {
		background: rgba(0, 212, 106, 0.83);
		display: block;
	}
	.rfu-dropzone--reject .rfu-dropzone__notifier {
		background: rgba(255, 0, 0, 0.83);
		display: block;
	}
	.rfu-dropzone__inner {
		width: 100%;
		height: 100%;
		padding: 30px;
		border: 1px dashed #fff;
		border-radius: 4px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		text-align: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		color: #fff;
		font-weight: 800;
		font-size: 12px;
	}
	.rfu-dropzone--reject .rfu-dropzone__inner {
		display: none;
	}
	.rfu-image-previewer {
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		margin: 8px 0;
	}
	.rfu-image-previewer,
	.rfu-image-previewer__image {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	.rfu-image-previewer__image {
		width: 100px;
		height: 100px;
		position: relative;
		margin-right: 8px;
		margin-bottom: 8px;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
	}
	.rfu-image-previewer__image--loaded .rfu-thumbnail__overlay {
		background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.4)), to(transparent));
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0, transparent);
	}
	.rfu-image-previewer__image .rfu-thumbnail__wrapper {
		position: absolute;
	}
	.rfu-image-previewer__image .rfu-loading-indicator {
		position: absolute;
		z-index: 90;
	}
	.rfu-image-previewer__retry {
		z-index: 90;
	}
	.rfu-image-upload-button {
		cursor: pointer;
	}
	.rfu-image-upload-button svg {
		fill: #a0b2b8;
	}
	.rfu-image-upload-button:hover svg {
		fill: #88979c;
	}
	.rfu-image-upload-button label {
		cursor: pointer;
	}
	.rfu-image-upload-button .rfu-image-input {
		width: 0;
		height: 0;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	}
	.rfu-loading-indicator {
		margin: 0 auto;
		width: 70px;
		text-align: center;
	}
	.rfu-loading-indicator > div {
		width: 18px;
		height: 18px;
		background-color: #ccc;
		border-radius: 100%;
		display: inline-block;
		-webkit-animation: sk-bouncedelay 1.4s ease-in-out infinite both;
		animation: sk-bouncedelay 1.4s ease-in-out infinite both;
	}
	.rfu-loading-indicator .bounce1 {
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}
	.rfu-loading-indicator .bounce2 {
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}
	@-webkit-keyframes sk-bouncedelay {
		0%,
		80%,
		to {
			-webkit-transform: scale(0);
			transform: scale(0);
		}
		40% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}
	@keyframes sk-bouncedelay {
		0%,
		80%,
		to {
			-webkit-transform: scale(0);
			transform: scale(0);
		}
		40% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}
	@-webkit-keyframes spinner {
		to {
			-webkit-transform: rotate(1turn);
			transform: rotate(1turn);
		}
	}
	@keyframes spinner {
		to {
			-webkit-transform: rotate(1turn);
			transform: rotate(1turn);
		}
	}
	.rfu-loading-indicator__spinner {
		width: 20px;
		height: 20px;
		border: 2px solid #eee;
		border-top-color: #00d46a;
		border-radius: 50%;
		-webkit-animation: spinner 0.6s linear infinite;
		animation: spinner 0.6s linear infinite;
	}
	.rfu-thumbnail__wrapper {
		width: 100px;
		height: 100px;
		border-radius: 4px;
		overflow: hidden;
		position: relative;
	}
	.rfu-thumbnail__overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.4);
		width: 100%;
		height: 100%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: start;
		-ms-flex-align: start;
		align-items: flex-start;
		-webkit-box-pack: end;
		-ms-flex-pack: end;
		justify-content: flex-end;
		padding: 5px;
	}
	.rfu-thumbnail__image {
		width: inherit;
		height: inherit;
		-o-object-fit: cover;
		object-fit: cover;
	}
	.rfu-thumbnail-placeholder {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		width: 100px;
		height: 100px;
		border: 1px dashed #bfbfbf;
		border-radius: 4px;
		cursor: pointer;
	}
	.rfu-thumbnail-placeholder:hover {
		background: #f2f2f2;
	}
`
