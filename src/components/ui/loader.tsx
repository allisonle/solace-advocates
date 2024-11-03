const Loader = () => {
	return (
		<div className="flex flex-row gap-2 items-center justify-center">
			<div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]"></div>
			<div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.3s]"></div>
			<div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]"></div>
		</div>
	);
};
export { Loader };
