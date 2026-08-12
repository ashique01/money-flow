interface Props {
  message: string;
}

export const ErrorBox = ({ message }: Props) => (
  <div className="glass-card p-5 text-center">
    <p className="text-sm text-destructive">{message}</p>
  </div>
);
